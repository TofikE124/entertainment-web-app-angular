import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable, Subscription, of, switchMap, take } from 'rxjs';
import { AppUser } from '../_models/AppUser';
import { Bookmark } from '../_models/Bookmark';
import { Title } from '../_models/Title';
import { AuthService } from './auth.service';

export enum BookmarkResponse {
  NOT_LOGGED_IN,
  SUCCESS,
}

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements OnDestroy {
  userSubscription: Subscription;
  user: AppUser | null = null;
  uid: string = '';
  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
    this.userSubscription = authService.getAppUser$().subscribe((user) => {
      this.user = user;
    });

    this.authService
      .getAuthState()
      .subscribe((state) => (this.uid = state?.uid || ''));
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async bookmark(title: Title) {
    if (!this.user) return BookmarkResponse.NOT_LOGGED_IN;
    let bookmarksId = await this.getOrCreateBookmarkLibrary();

    await this.updateBookmark(bookmarksId, title);

    if (!title.bookmarked) return BookmarkResponse.SUCCESS; //If the title was not bookmarked that means it is bookmarked now

    // Add to recentlyRemoved
    let recentlyRemoved: number[] = JSON.parse(
      localStorage.getItem('recentlyRemoved') || '[]'
    );
    recentlyRemoved.push(title.key);
    localStorage.setItem('recentlyRemoved', JSON.stringify(recentlyRemoved));
    return BookmarkResponse.SUCCESS;
  }

  private async getOrCreateBookmarkLibrary() {
    if (this.user?.bookmarkLibraryId) return this.user.bookmarkLibraryId;
    return this.createBookmarkLibrary();
  }

  private async createBookmarkLibrary() {
    let result = await this.db.list('/bookmarkLibraries').push({
      dateCreated: new Date().getTime(),
    });
    this.db
      .object('/users/' + this.uid)
      .update({ bookmarkLibraryId: result.key });
    return result.key!;
  }

  private async createBookmark(bookmarksId: string, title: Title) {
    this.db
      .object(`/bookmarkLibraries/${bookmarksId}/${title.key}`)
      .update({ bookmarked: true });
  }

  private async updateBookmark(bookmarksId: string, title: Title) {
    let bookmark$ = await this.getBookmark(bookmarksId, title);
    bookmark$
      .valueChanges()
      .pipe(take(1))
      .subscribe((bookmark) => {
        if (!bookmark) this.createBookmark(bookmarksId, title);
        else bookmark$.update({ bookmarked: !bookmark.bookmarked });
      });
  }

  private async getBookmark(bookmarksId: string, title: Title) {
    let result = await this.db.object(
      `/bookmarkLibraries/${bookmarksId}/${title.key}`
    );

    return result as AngularFireObject<null | Bookmark>;
  }

  getAllBookmarks() {
    return this.getAllBookmarks$().pipe(
      switchMap((bookmarks$) => {
        return bookmarks$;
      })
    );
  }

  private getAllBookmarks$() {
    return this.authService.getAppUser$().pipe(
      switchMap(async (user) => {
        if (!user) return of([]);

        let bookmarkLibraryId = await this.getOrCreateBookmarkLibrary();

        let bookmarks$ = this.getBookmarkLibrary(bookmarkLibraryId)!;
        return bookmarks$;
      })
    );
  }

  private getBookmarkLibrary(bookmarkLibraryId: string) {
    return this.db
      .object('/bookmarkLibraries/' + bookmarkLibraryId)
      .valueChanges() as Observable<Bookmark[]>;
  }
}
