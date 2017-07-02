import { Component } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';
import { AngularFireDatabase , FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
  books : FirebaseListObservable<any>;	

  constructor(public navCtrl: NavController, public alertCtrl: AlertController , public angFire:AngularFireDatabase) {

  	this.books = angFire.list('/Books');

  }

  addBook():void {
  	let prompt = this.alertCtrl.create({
  		title: 'Book Title and Author',
  		message: 'Enter the book Title and Author',
  		inputs :[
  				{
  					name : "title",
  					placeholder :"Book Title"
  				},
  				{
  					name : "author",
  					placeholder :"Book Author"
  				}
  			],
  		buttons : [
  				  {
  				  	text : "Cancel",
  				  	handler : data=>{
  				  			console.log("Cancel Clicked");
  				  	}
  				  },
  				  {
  				  	text : "Save",
  				  	handler : data=>{
  				  			this.books.push({
  				  				title: data.title,
  				  				author: data.author
  				  			});
  				  	}
  				  }
  		]	
  		
  	});

  	prompt.present();
  }

  editBook(book):void {
  	let prompt = this.alertCtrl.create({
  		title: 'Edit Book',
  		message: 'Edit the book Title and Author',
  		inputs :[
  				{
  					name : "title",
  					placeholder : book.title
  				},
  				{
  					name : "author",
  					placeholder : book.author
  				}
  			],
  		buttons : [
  				  {
  				  	text : "Cancel",
  				  	handler : data=>{
  				  			console.log("Cancel Clicked");
  				  	}
  				  },
  				  {
  				  	text : "Save",
  				  	handler : data=>{
  				  			let newTitle:String = book.title;
  				  			let newAuthor:String = book.author;

  				  			if(data.title != ''){
  				  				newTitle = data.title;
  				  			}

  				  			if(data.author != ''){
  				  				newAuthor = data.author;
  				  			}

  				  			this.books.update(book.$key , {
  				  				title: newTitle,
  				  				author: newAuthor
  				  			});
  				  	}
  				  }
  		]	
  		
  	});

  	prompt.present();
  }

  deleteBook(bookID):void {
  	let prompt = this.alertCtrl.create({
  		title: 'Delete Book',
  		
  		buttons : [
  				  {
  				  	text : "Cancel",
  				  	handler : data=>{
  				  			console.log("Cancel Clicked");
  				  	}
  				  },
  				  {
  				  	text : "Delete",
  				  	handler : data=>{
  				  			this.books.remove(bookID);
  				  	}
  				  }
  		]	
  		
  	});

  	prompt.present();
  }
}
