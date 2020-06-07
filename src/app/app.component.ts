import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tasksList = []
  task = new Model();
  dataHora

  showHideIpAndLocation = true
  showHideDateTime = true
  showHideUSDbyBRL = true

  constructor(private appService: AppService) { }

  ngOnInit() {

    this.showHideDateTime = JSON.parse(localStorage.getItem('showHideDateTime'));
    this.showHideIpAndLocation = JSON.parse(localStorage.getItem('showHideIpAndLocation'));
    this.showHideUSDbyBRL = JSON.parse(localStorage.getItem('showHideUSDbyBRL'));

    if (localStorage.getItem('tasksList'))
      this.tasksList = JSON.parse(localStorage.getItem('tasksList'));

    if (this.showHideDateTime) {
      this.thisDateTime()
    }

    if (this.showHideIpAndLocation)
      this.getIpAdress()

    if (this.showHideUSDbyBRL)
      this.getDolarToday()


  }


  setFocusToTextBox() {
    this.viewTextArea = true

    setTimeout(function () {
      var textbox = document.getElementById("input-terminal");
      textbox.focus();
      // textbox.scrollIntoView();
    }, 500);
  }

  thisDateTime() {
    let date = moment(new Date()).format('MMMM DD YYYY');
    let week = moment(new Date()).format('dddd');
    this.dataHora = week + ", " + date;

    setInterval(function () {
      var clock = document.getElementById('real-clock');
      clock.innerHTML = ((new Date).toLocaleString().substr(11, 8));
    }, 1000);

    if (!this.showHideDateTime) {
      for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
    }
  }


  viewTextArea
  onSubmit() {
    this.task.id = this.generateId(20)
    this.task.dateCad = new Date();
    this.task.status = true

    this.tasksList.push(this.task);

    localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
    this.toasty("Created")

    this.viewTextArea = false;
    this.task = new Model();
  }


  mouseOver(event) {
    var element = document.getElementById("btn-" + event);
    element.setAttribute("style", "display: block;");
  }
  mouseOut(event) {
    var element = document.getElementById("btn-" + event);
    element.setAttribute("style", "display: none;");
  }


  onUpdate(item) {
    let objIndex = this.tasksList.findIndex((obj => obj.id == item.id));
    if (objIndex >= 0) {
      this.tasksList[objIndex].dateUpd = new Date();
      this.tasksList[objIndex].status = false
    }
    localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
    this.toasty("Updated")
  }

  onRemove(item) {
    let index = this.tasksList.indexOf(item);
    if (index > -1) {
      this.tasksList.splice(index, 1);
    }
    localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
    this.toasty("Removed")
  }




  ipAdress
  getIpAdress() {
    this.appService.getIpAdress().subscribe((data: any) => {
      this.ipAdress = data.origin
      this.getLocation(data.origin)
    });
  }

  dolarToday
  getDolarToday() {
    let today = moment(Date()).format('MM-DD-YYYY');
    this.appService.getDolarToday(today).subscribe((data: any) => {
      this.dolarToday = data.USD.ask
    });
  }

  location
  getLocation(ip) {
    this.appService.getLocation(ip).subscribe((data: any) => {
      this.location = data
    });
  }


  actionShowHideDateTime() {
    this.showHideDateTime = !this.showHideDateTime
    localStorage.setItem('showHideDateTime', JSON.stringify(this.showHideDateTime));
    this.thisDateTime()
  }

  actionShowHideIpAndLocation() {
    this.showHideIpAndLocation = !this.showHideIpAndLocation
    localStorage.setItem('showHideIpAndLocation', JSON.stringify(this.showHideIpAndLocation));
    if (this.actionShowHideIpAndLocation) {
      this.getIpAdress()  // ip adress get location also
    }
  }
  actionShowHideUSDbyBRL() {
    this.showHideUSDbyBRL = !this.showHideUSDbyBRL
    localStorage.setItem('showHideUSDbyBRL', JSON.stringify(this.showHideUSDbyBRL));
    if (this.showHideUSDbyBRL)
      this.getDolarToday()
  }






  // generateId :: Integer -> String
  generateId(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
  }
  // dec2hex :: Integer -> String
  dec2hex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
  }


  toasty(message: string) {
    var element = document.getElementById("snackbar");
    element.className = "show";
    element.innerHTML = message;
    setTimeout(function () { element.className = element.className.replace("show", ""); }, 2900);
  }

}

export class Model {
  id: string
  context: string
  dateCad: Date
  dateUpd: Date
  status: boolean
}
