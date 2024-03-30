import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Matheus",
    image: "https://i.pravatar.cc/48?$=1",
    balance: -7,
  },
  {
    id: 933372,
    name: "Júlia",
    image: "https://i.pravatar.cc/49?=$1",
    balance: 20,
  },
  {
    id: 499476,
    name: "Arthur Juan",
    image: "https://i.pravatar.cc/48?=$0",
    balance: 0,
  },
];

function Button({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>
}

export default function App() {

  const [friends, setFriends] = useState(initialFriends);

  const [showAddFriend, setShowAddFriend] = useState(true);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend(curr => curr?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  return <div className="app">
    <div className="sidebar">
      <FriendList friends={friends} selectedFriend={selectedFriend}  onSelectedFriend={handleSelectedFriend}/>

      {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}

      <Button onClick={handleShowAddFriend} >{showAddFriend ? "Close" : "Add Friend"}</Button>

    </div>
   {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}/>}
  </div>
}

function FriendList({friends, onSelectedFriend, selectedFriend}) {

  return (
    <ul>
      {
       friends.map((friend) => (
        <Friend friend={friend} key={friend.id} selectedFriend={selectedFriend} onSelectedFriend={onSelectedFriend} />
       ))
      }
    </ul>
  );
}

function Friend({friend, onSelectedFriend, selectedFriend}){

  const isSelected = selectedFriend?.id === friend.id;

  return <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name} R${Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you R${Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && <p className="blue"> You and {friend.name} are even R${Math.abs(friend.balance)}</p>}
      <Button onClick={() => onSelectedFriend(friend)}>{isSelected? "Close" : "Selected"}</Button>
    </li>
}

function FormAddFriend({onAddFriend}) {

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if(!name && !image) {
      return;
    }

    const id = crypto.randomUUID;

    const newFriend = {
      id,
      name, 
      image: `${image}?=${id}`, 
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>Friend name 😎</label>
    <input type="text" value={name} onChange={e => setName(e.target.value)}/>

    <label>Image URL 🖼️</label>
    <input type="text" value={image} onChange={e => setImage(e.target.value)}/>

    <Button>Add</Button>
  </form>
}

function FormSplitBill({selectedFriend}) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill value 💲</label>
      <input type="text" />

      <label>Your expenses 🎭</label>
      <input type="text" />

      <label>{selectedFriend.name}'s expenses 🎈</label>
      <input type="text" disabled/>

      <label>Who is paying the bill? 🤖</label>
      <select>
        <option value="user">You</option>
        <option value="fried">{selectedFriend.name}</option>
      </select>

      <button>Split bill</button>
    </form>
  )
}