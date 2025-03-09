import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  people: any[] = [];
  editingPerson: any = null;

  async fetchPeople() {
    try {
      const res = await axios.get('http://localhost:3000/users');
      this.people = res.data;
    } catch (err) {
      console.error('Error fetching people:', err);
    }
  }

  async addPerson(form: any) {
    if (!form.valid) return;

    const { name, age, gender, mobile } = form.value;

    try {
      if (this.editingPerson) {
        await axios.put(`http://localhost:3000/users/${this.editingPerson._id}`, {
          name,
          age,
          gender,
          mobile,
        });
        this.editingPerson = null; // Reset after editing
      } else {
        await axios.post('http://localhost:3000/users', { name, age, gender, mobile });
      }
      form.resetForm();
      console.log('Person saved successfully');
      this.fetchPeople();
    } catch (err) {
      console.error('Error saving person:', err);
    }
  }

  formData = { name: '', age: '', gender: '', mobile: '' };

editPerson(person: any) {
  this.editingPerson = person;
  this.formData = { ...person }; // Clone data to avoid direct binding issues
}


  async deletePerson(id: string) {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      this.fetchPeople();
    } catch (err) {
      console.error('Error deleting person:', err);
    }
  }

  ngOnInit() {
    this.fetchPeople();
  }
}
