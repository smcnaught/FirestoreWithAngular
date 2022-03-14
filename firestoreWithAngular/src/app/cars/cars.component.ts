import { Component } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from "@angular/fire/compat/firestore";

export interface ICar {
  ID: number;
  make: string;
  model: string;
  year: number;
  color: string;
}

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
})
export class CarsComponent {
  public cars: ICar[] = [];
  public newCar: ICar = { ID: 0, make: "", model: "", year: 0, color: "" };
  private carDB: AngularFirestoreCollection<ICar[]>;

  constructor(private afs: AngularFirestore) {
    this.carDB = this.afs.collection<ICar[]>('cars');
    this.setupColorDbListener();
  }

  public add(): void {
    if (this.newCar.ID) {
      this.afs.collection('cars').doc(`car-id-${this.newCar.ID}`).set(this.newCar);
    }
  }

  public delete(carID: number): void {
    this.afs.collection('cars').doc(`car-id-${carID}`).delete()
  }

  private setupColorDbListener(): void {
    this.carDB.valueChanges().subscribe((response: ICar[] | any) => {
      this.cars = response;
    })
  }
}