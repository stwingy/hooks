import firebaseConfig from './config';
import 'firebase/auth';
import 'firebase/firestore';
import app from 'firebase/app';

class Fireb {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.db = app.firestore()
	}

	async register(name, email, password) {
		const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
		return await newUser.user.updateProfile({ displayName: name });
	}
	async login(email, password) {
		return await this.auth.signInWithEmailAndPassword(email, password);
	}
	async logout() {
		await this.auth.signOut();
	}
	async resetPassword(email){
		await this.auth.sendPasswordResetEmail(email)
	}
}
const firebase = new Fireb();
export default firebase;
