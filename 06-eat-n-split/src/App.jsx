import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Hasan",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sofy",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Alaa",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  {
    id: 4994206,
    name: "Shrouk",
    image: "https://i.pravatar.cc/48?u=499276",
    balance: 0,
  },
  {
    id: 4909426,
    name: "Moayad",
    image: "https://i.pravatar.cc/48?u=499471",
    balance: 0,
  },
  {
    id: 40099426,
    name: "Mahmoud",
    image: "https://i.pravatar.cc/48?u=299476",
    balance: 0,
  },
  {
    id: 499426,
    name: "Sally",
    image: "https://i.pravatar.cc/48?u=499406",
    balance: 0,
  },
];

export default function App() {
  const [friendsData, setFriendsData] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(newFriend) {
    setFriendsData((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }
  function handleSelection(friend) {
    // setSelectedFriend(selected);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriendsData((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendsData={friendsData}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={() => setShowAddFriend(!showAddFriend)}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplit={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendList({ friendsData, onSelection, selectedFriend }) {
  return (
    <ul>
      {friendsData.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "friend selected" : "friend"}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleOnSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id: id,
      name: name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
  }
  return (
    <form className="form-add-friend" onSubmit={(e) => handleOnSubmit(e)}>
      <label>👯Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(i) => setName(i.target.value)}
      />
      <label>🖼️ Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(i) => setImage(i.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplit }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill - paidByUser;
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplit(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>Split a bill with {selectedFriend?.name}</h2>
      <label>💸 Bill Value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>💸 your expenses</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>💸 {selectedFriend.name}'s expenses</label>
      <input type="number" disabled value={paidByFriend} />

      <label>💸 Who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend?.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
