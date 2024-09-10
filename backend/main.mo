import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Int "mo:base/Int";

actor {
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  stable var posts : List.List<Post> = List.nil();
  stable var nextPostId : Nat = 0;

  public func createPost(title: Text, body: Text, author: Text) : async Result.Result<Nat, Text> {
    let post : Post = {
      id = nextPostId;
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := List.push(post, posts);
    nextPostId += 1;
    #ok(post.id)
  };

  public query func getPosts() : async [Post] {
    List.toArray(List.reverse(posts))
  };
}
