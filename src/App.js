const initialFriends = [
  {
    id: 118836,
    name: "Matheus",
    image: "https://media.licdn.com/dms/image/C4E03AQHipfecLDt15g/profile-displayphoto-shrink_800_800/0/1614798966051?e=1717027200&v=beta&t=kT6e05qAW8FF627EwviHzkOqkJd0x-xhtF6zEC-ojbY",
    balance: -7,
  },
  {
    id: 933372,
    name: "Júlia",
    image: "https://media.licdn.com/dms/image/D4D35AQEIM5PRMqU6ew/profile-framedphoto-shrink_800_800/0/1701185896637?e=1712242800&v=beta&t=ZJVjv9yxEel0P0wF57fqWCvojCGeZyBZ03Deyn8mDnA",
    balance: 20,
  },
  {
    id: 499476,
    name: "Arthur Juan",
    image: "https://media.licdn.com/dms/image/D4E35AQHhMo2muNERsg/profile-framedphoto-shrink_800_800/0/1653270464211?e=1712242800&v=beta&t=Oj4Wims-47hovm4GijuSJRlr0pt7ihJAfa_6yTKWUaA",
    balance: 0,
  },
];


export default function App() {
  return <div className="app">
    <div className="sidebar">
      <FriendList />
      <FormAddFriend />
      <Button>Add Friend</Button>
    </div>
    <FormSplitBill />
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
      <Button>Select</Button>
    </li>
}

function Button({children}) {
  return <button className="button">{children}</button>
}

function FormAddFriend() {
  return <form className="form-add-friend">
    <label>Friend name 😎</label>
    <input type="text" input/>
    <label>Image URL 🖼️</label>
    <input type="text" input/>
    <Button>Add</Button>
  </form>
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>Bill value 💲</label>
      <input type="text" />

      <label>Your expenses 🎭</label>
      <input type="text" />

      <label>X's expenses 🎈</label>
      <input type="text" disabled/>

      <label>Who is paying the bill? 🤖</label>
      <select>
        <option value="user">You</option>
        <option value="fried">X</option>
      </select>

      <button>Split bill</button>
    </form>
  )
}