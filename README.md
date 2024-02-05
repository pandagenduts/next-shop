# NextShop

A simple eshop with Next JS, Zustand, Shadcn UI, Firebase (Auth & Firestore), and Midtrans Payment Gateway


## Tech Stack

- [Next.js](https://nextjs.org)
- [Next Auth](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [ShadCN UI](https://ui.shadcn.com/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Midtrans](https://midtrans.com/)

## Features

- Basic Credentials authentication using Firebase Authentication coupled with Next Auth
 - Sign up
 - Sign in
 - Forgot Password
- Cart
- Checkout
- Handle Payment with Midtrans Payment Gateway
- Orders History

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/pandagenduts/next-shop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Project on Firebase
This project use Firebase Authentication for the Auth, and Firestore as the database. For the Firebase Authentication, use Email/Password Provider. For the Firestore, I use this rule:

```plaintext
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    
    match /users/{user} {
    	allow read, write: if true;
    }
    
    match /users/{user}/orders/{order} {
    	allow read, write: if true;
    }
  }
}
```

After you set things up like I said, click the **Gear Icon** beside **Project Overview** (under Firebase logo, top left) > **Project Settings** > **Your Apps** > **Web App**

There you will find the Firebase apiKey, authDomain, etc

### 4. Create account on Midtrans
This project use Sandbox mode for the Midtrans. 

After you get to Midtrans dashboard, go to the **Settings** > **Access Keys** to find the **Client** and **Server Key**

### 5. Create a `.env` file

Create a `.env` file in the root directory and add the environment variables as shown in the `.env.example` file. Then just simply fill the value you get from steps above, easy right?

If you dont find it, heres the `.env` variables: 
```plaintext
NEXT_PUBLIC_BASE_URL='http://localhost:3000'

NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET=''

NEXT_PUBLIC_MIDTRANS_CLIENT=''
MIDTRANS_SERVER=''

NEXT_PUBLIC_FIREBASE_APIKEY=''
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=''
NEXT_PUBLIC_FIREBASE_PROJECTID=''
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=''
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=''
NEXT_PUBLIC_FIREBASE_APPID=''
NEXT_PUBLIC_FIREBASE_MEASUREMENTID=''
```

Anyway, to get the NEXTAUTH_SECRET, you can type this in terminal and copy paste the value
```bash
openssl rand -base64 32
```

### 6. Run the application

```bash
npm run dev
```

##Deployment
Just dont forget to change the **NEXT_PUBLIC_BASE_URL** and **NEXTAUTH_URL** on the server depending on the base URL of the deployed projects