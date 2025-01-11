const { Firestore } = require('@google-cloud/firestore')

const firestore = new Firestore()
const { getDemoData } = require('./demodata')

require('dotenv').config(); 
const MODE = process.env?.MODE || 'PROD'


let teams = []
let matches = []
let entries = []
let status = {
  lastOLRequest : null
}

const readTeams = async () => {
  if (MODE === 'DEV') {
    console.log("Reading teams from demo data")
    return getDemoData('teams')
  }
  try {
    if (!teams.length) {
      const snapshot = await firestore.collection('teams').get()
      teams = snapshot.docs.map(doc => doc.data())
    }
    return teams
  } catch (error) {
    console.log("Error in readTeams: ", error)
  } 
}

const readStatus = async () => {
  if (MODE === 'DEV') {
    return getDemoData('status')
  }  
  // TODO also time check (5 minutes or so)
  if (!status.lastOLRequest) {
    const docRef = firestore.collection("olstatus").doc("current")
    const doc = await docRef.get()
    status = doc.data()
    const now = new Date();
    const sqlDateString = now.toISOString()
    status.lastOLRequest = sqlDateString
  }
  return status
}

const readMatches = async () => {
  if (MODE === 'DEV') {
    return getDemoData('matches')
  }  
  if (!matches.length) {
    const snapshot = await firestore.collection('matches').get()
    matches = snapshot.docs.map(doc => doc.data())
  }
	return matches
}


const readRankings = async () => {
  if (MODE === 'DEV') {
    return getDemoData('rankings')
  }  
  if (!entries.length) {
    const snapshot = await firestore.collection('ranking').get()
    const dbEntries = snapshot.docs.map(doc => doc.data())
    dbEntries.sort((a,b) => {
      if (a.points < b.points) return 1
      if (a.points > b.points) return -1
      if (a.goalDiff < b.goalDiff) return 1
      if (a.goalDiff > b.goalDiff) return -1
      if (a.goals < b.goals) return 1
      if (a.goals > b.goals) return -1
      return 0
    })
    entries = dbEntries.map((entry,index) => {
      const result = {...entry, rank: index+1}
      return result
    })
  }
	return entries
}

const getMatchesForTeam = async (teamId) => {
  let matches = null
  if (MODE === 'DEV') {
    matches = getDemoData('matches')
  } else {
    matches = await readMatches()
  }
  const results = matches.filter(match => match.team1.teamId === teamId || match.team2.teamId === teamId)
  return results
}

const getNextGameForTeam = async (teamId) => {
  const matches = await getMatchesForTeam(teamId)
  // TODO assume that the ordering is correct
  const futureMatches = matches.filter(match => match.matchIsFinished === false)
  if (!futureMatches) {
    return []
  }
  const nextMatch = futureMatches[0]
  for (const match of futureMatches) {
    if (match.matchDateTimeUTC < nextMatch.matchDateTimeUTC) {
      nextMatch = match
    }
  }
  return nextMatch
}

const getLastGameForTeam = async (teamId) => {
  const matches = await getMatchesForTeam(teamId)
  // TODO assume that the ordering is correct
  const pastMatches = matches.filter(match => match.matchIsFinished === true)
  if (!pastMatches) {
    return []
  }
  const lastMatch = pastMatches[0]
  for (const match of pastMatches) {
    if (match.matchDateTimeUTC > lastMatch.matchDateTimeUTC) {
      lastMatch = match
    }
  }
  return lastMatch
}

const readTipps = async (userId) => {
  if (MODE === 'DEV') {
    return getDemoData('tipps')
  }
  const snapshot = await firestore.collection('tipps').where('userId', '==', userId).get()
  const tipps = snapshot.docs.map(doc => doc.data())
  return tipps
}
  
const setTipps = async (userId, tipps) => {
  console.log("Setting tipps for user: ", userId)
  console.log("Tipps: ", tipps)
}

const getUser = async (userId) => {
  const testUser = {
    id:'testuser',
    name:'Test User'
  }
  return testUser
} 

const readUsers = async () => {
  return [await getUser('testuser')]
}


module.exports = { readTeams, readMatches, readRankings, getNextGameForTeam, getLastGameForTeam, readStatus, readTipps, setTipps, readUsers, getUser }