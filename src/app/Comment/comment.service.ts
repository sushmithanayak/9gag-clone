import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Comment } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public comments: Comment[] = [];
  private postId: string;
  private commentsUpdate = new Subject<Comment[]>();


  getCommentSubs = () => {
    return this.commentsUpdate.asObservable();
  }

  addComment = (content: string, postId: string) =>
  {
    let form: FormData = new FormData();
    form.append("content", content);
    form.append("postId", postId);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }

    this.http.post<{message: string, comment: Comment}>("http://localhost:3000/comments/create", form)
    .subscribe(payload => {
      const comment = payload.comment;
      this.comments.push(comment);
      this.commentsUpdate.next([...this.comments]);
    });
  }

}


// const comment:Comment = {
    //   _id: null,
    //    content: content,
    //     count:{
    //       upvotes: 0,
    //       downvotes: 0,
    //       replies: 0
    //     },
    //     post: null, 
    //     commenterId: uid,
    //     commenterUsername: usn
    // }