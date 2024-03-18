import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { map, of, skip, switchMap } from 'rxjs';
import { Title } from '../_models/Title';
import { BookmarkService } from './bookmark.service';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    private db: AngularFireDatabase,
    private bookmarkService: BookmarkService
  ) {}

  async getAll() {
    return this.db
      .list('/titles')
      .snapshotChanges()
      .pipe(
        switchMap(async (titles) => {
          let newTitles: Title[] = [];
          newTitles = this.getTitlesWithKeys(titles);

          const bookmarks$ = await this.bookmarkService.getAllBookmarks();
          return bookmarks$.pipe(
            switchMap((bookmakrs) => {
              newTitles = newTitles.map((t) => ({
                ...t,
                bookmarked: bookmakrs[t.key]?.bookmarked || false,
              })) as Title[];
              return of(newTitles);
            })
          );
        })
      );
  }
  private getTitlesWithKeys(titles: SnapshotAction<unknown>[]) {
    return titles.map((title) => ({
      key: Number(title.key),
      bookmarked: false,
      ...(title.payload.val() as Omit<Title, 'key' | 'bookmarked'>),
    })) as Title[];
  }
}
