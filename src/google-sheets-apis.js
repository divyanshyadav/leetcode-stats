import fs from 'fs'
import util from 'util'
import readline from 'readline'
import { google } from 'googleapis'

const readFile = util.promisify(fs.readFile);
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json'
const SPREADSHEET_ID =  '145HJOVF3fzmv2aS-rtRuy8fSEUEt_QTmrZCj3JjZb6M'

async function getSheetRows() {
  const content = await readFile(CREDENTIALS_PATH)
  const auth = await authorize(JSON.parse(content));
  const rows = await getSheet(auth)
  return rows
}

async function authorize(credentials) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  let token = ''
  try {
    token = await readFile(TOKEN_PATH)
  } catch (err) {
      token = await getNewToken(oAuth2Client)
      saveToken(token)
  }
  
  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client
}

function getNewToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) reject('Error while trying to retrieve access token', err);
        resolve(token)
      });
    });

  })
}

function saveToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.error(err);
      console.log('Token stored to', TOKEN_PATH);
  });
}

function getSheet(auth) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1',
    }, (err, res) => {
      if (err) return reject('The API returned an error: ' + err);
      resolve(res.data.values);
    });
  })
}

module.exports = {
  getSheetRows
}