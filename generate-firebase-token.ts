// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { initializeApp } from "firebase-admin";

// const firebaseConfig = {
    
// }
// export function signIn(withEmail: string, password: string) {

// }

import fetch from 'node-fetch'
import "dotenv/config"

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY!

interface FirebaseSignInResponse {
  idToken: string
  refreshToken: string
  expiresIn: string
  localId: string
}

export async function signInWithEmailPassword(
  email: string,
  password: string
): Promise<string> {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  )

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Firebase auth failed: ${err}`)
  }

  const data = (await response.json()) as FirebaseSignInResponse

  // ✅ This is the Bearer token your AuthGuard wants
  console.log(data.idToken);
  return data.idToken
}
signInWithEmailPassword(process.env.email!, process.env.password!)