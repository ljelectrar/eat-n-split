const initialFriends = [
  {
    id: 118836,
    name: "Matheus",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Claudão",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Arthur",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  return <div className="app">
    <div className="sidebar">
      <FriendList />
    </div>
  </div>
}

function FriendList() {
  const friends = initialFriends;

  return (
    <ul>
      {
       friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
       ))
      }
    </ul>
  );
}

function Friend({friend}){
  return <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name} R${Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you R${Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && <p className="blue"> You and {friend.name} are even R${Math.abs(friend.balance)}</p>}
      <button className="button">Select'</button>
    </li>
}