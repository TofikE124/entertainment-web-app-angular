import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Title } from './_models/Title';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list('/titles')
      .snapshotChanges()
      .pipe(
        map((titles) =>
          titles.map((title) => ({
            key: title.key,
            ...(title.payload.val() as Omit<Title, 'key'>),
          }))
        )
      ) as Observable<Title[]>;
  }
}
