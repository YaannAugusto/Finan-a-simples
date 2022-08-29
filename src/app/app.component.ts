import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Finance } from 'src/models/finance.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: String = 'Finanças';
  public finances: Finance[] = [];
  public form: FormGroup;
  public count: Number = 0;
  public countPos: Number = 0;
  public countNeg: Number = 0;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      spent: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])],

      sym: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(1),
        Validators.required,
      ])],

      cost: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(6),
        Validators.required,
      ])]
    });
    

  
  }

  add()
  {
    const id = this.finances.length + 1;
    const spent = this.form.controls['spent'].value;
    let cost = this.form.controls['cost'].value;
    let sym = this.form.controls['sym'].value;
    let gain = true;// = true;

    if(sym == '+')
    {
      gain = true;
      this.countPos += cost;
    }
    else 
    {
      gain = false;
      this.countNeg += cost;
      cost = -(cost);
    }
    
    
    this.count += cost;

    this.finances.push(new Finance(id, spent, sym, cost, gain));
    this.save();
    this.clear();
  }
   
  save()
  {
    const data = JSON.stringify(this.finances);
    localStorage.setItem('finances', data);
  }

  clear()
  {
    this.form.reset();
    this.save();
  }


}
