import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  people: any[] = [];

  async fetchPeople() {
    try {
      const res = await fetch('http://localhost:3000/users');
      if (!res.ok) throw new Error('Failed to fetch');
      this.people = await res.json();
    } catch (err) {
      console.error('Error fetching people:', err);
    }
  }

  async addPerson(form: any) {
    if (!form.valid) {
      console.error('All fields are required.');
      return;
    }

    const { name, age, gender, mobile } = form.value;

    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, gender, mobile }),
      });
      console.log(res);
      if (!res.ok) throw new Error('Failed to add person');
      this.fetchPeople();
      form.reset();
    } catch (err) {
      console.error('Error adding person:', err);
      
    }
  }

  ngOnInit() {
    this.fetchPeople();
  }
}
