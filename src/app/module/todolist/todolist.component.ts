import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: string = new Date().toISOString().substring(0, 10);
  appointments: Appointment[] = [];

  ngOnInit(): void {
    const savedAppointments = localStorage.getItem('appointment');
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }

  addAppointment(): void {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      const newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      };
      this.appointments.push(newAppointment);
      this.saveAppointments();
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date().toISOString().substring(0, 10);
    }
  }

  deleteAppointment(index: number): void {
    this.appointments.splice(index, 1);
    this.saveAppointments();
  }

  saveAppointments(): void {
    localStorage.setItem('appointment', JSON.stringify(this.appointments));
  }
}
