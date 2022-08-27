import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

actor Avatar {
  type Bio = { 
    givenName: ?Text;
    familyName: ?Text;
    name: ?Text;
    displayName: ?Text;
    location: ?Text;
    about: ?Text;
  };

  type Profile = {
    bio : Bio;
    //Principal will allow us to have each unique user and each user can only update their own Profile
    id: Principal;
  };


  //We don't want someone to pass the ID, we do a ProfileUpdate
  type ProfileUpdate = {
    bio : Bio;
  };

  type Error = {
    //Variant and each attribute will be tag with #
    #NotFound;
    #AlreadyExist;
    #NotAuthorized;
  };

  //Principal is a key, Profile is a type, we initialise with empty
  stable var profiles : Trie.Trie<Principal, Profile> = Trie.empty();


  //Create a profile
  public shared(msg) func create (profile: Profile) : async Result.Result<(), Error> {
    
    let callerId = msg.caller; //type Principal

    //Reject Anonymous Identity 2vxsx-fae
    if(Principal.toText(callerId) == "2vxsx-fae") {
      return #err(#NotAuthorized);
    };

    //Associate user profil with their principal
    let userProfile : Profile = {
      bio = profile.bio;
      id = callerId;
    };

    // newProfiles is the result of Trie and existing is the value at the key
    let(newProfiles, existing) = Trie.put(
      profiles,           //Target trie
      key(callerId),      //Key
      Principal.equal,    //Equality checker
      userProfile
    );

    switch(existing) {
      //If there are no matches with the profiles, we'll reassign to a new profile
      case null {
        profiles := newProfiles;
        #ok(());
      };
      //If there is a existing profile, the ? v mean there is value and we 
      //don't want to create a new profile with the matches one
      case(? v) {
        #err(#AlreadyExist)
      };
    };
  };


  //Function read a profile and return a profil if it's a success case, otherwise and variant Error
  public shared(msg) func read () : async Result.Result<Profile, Error>{

    //Get caller principal
    let callerId = msg.caller;

    //Reject Anonymous Identity 2vxsx-fae
    if(Principal.toText(callerId) == "2vxsx-fae") {
      return #err(#NotAuthorized);
    };

    let result = Trie.find(
      profiles,             //Target trie
      key(callerId),        //Key
      Principal.equal,      //Equality checker
    );
    return Result.fromOption(result, #NotFound); 
  };


  //Function that update a profile
  public shared(msg) func update (profile : Profile) : async Result.Result<(), Error> {
    
    //Get caller principal
    let callerId = msg.caller;

    //Reject Anonymous Identity 2vxsx-fae
    if(Principal.toText(callerId) == "2vxsx-fae") {
      return #err(#NotAuthorized);
    };

    //Reject Anonymous Identity 2vxsx-fae
    if(Principal.toText(callerId) == "2vxsx-fae") {
      return #err(#NotAuthorized);
    };

    //Associate user profil with their principal
    let userProfile : Profile = {
      bio = profile.bio;
      id = callerId;
    };

    let result = Trie.find(
      profiles,             //Target trie
      key(callerId),        //Key
      Principal.equal,      //Equality checker
    );

    switch(result){
      //If there is no profile, we'll not allow any update to be written 
      case null {
        #err(#NotFound);
      };
      //If there is a profile 
      case(? v) {
        //we'll override profile to the result of the function Trie.replace
        profiles := Trie.replace(
          profiles,             //Target trie
          key(callerId),        //Key
          Principal.equal,      //Equality checker
          ?userProfile          //Profile that we want to override
        ).0;                    //The result is a tuple of the new profile 
        #ok(());
      };
    };
  };

  //Function that delete a profile
  public shared(msg) func delete (profileId : Nat) : async Result.Result<(), Error> {
    
    //Get caller principal
    let callerId = msg.caller;

    //Reject Anonymous Identity 2vxsx-fae
    if(Principal.toText(callerId) == "2vxsx-fae") {
      return #err(#NotAuthorized);
    };

    let result = Trie.find(
      profiles,             //Target trie
      key(callerId),        //Key
      Principal.equal,      //Equality checker
    );

    switch(result){
      //If there is no profile, we'll not allow any update to be written 
      case null {
        #err(#NotFound);
      };
      //If there is a profile 
      case(? v) {
        //we'll override profile to the result of the function Trie.replace
        profiles := Trie.replace(
          profiles,             //Target trie
          key(callerId),        //Key
          Principal.equal,      //Equality checker
          null                  //If deleted, it return null
        ).0;                    //The result is a tuple of the new profile         
        #ok(());
      };
    };
  };
  
  //Function to get the key
  private func key(x : Principal) : Trie.Key<Principal> {
    return { key = x; hash = Principal.hash(x) }
  };

}