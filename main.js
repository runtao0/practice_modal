let data = {
  "invites": [
    {
      "outlet_id": "Z6rg1Vw3Mjkz",
      "user_id": null,
      "email": "newuser@fresconews.com",
      "used": false,
      "expires_at": "2017-03-10T03:36:44.432Z",
      "created_at": "2017-03-03T03:36:44.432Z"
    }
  ],
  "users": [
    {
      "id": "7ewm8YP3GL5x",
      "email": "elmir@fresconews.com",
      "username": "elmir",
      "full_name": "Elmir Kouliev",
      "phone": "18455989555",
      "avatar": "https://cdn.fresconews.com/images/5de2af34cb8cfaeb3a5c4ebe7695176c_1480905454108_avatar.jpg",
      "object": "user"
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const ulParent = document.getElementById("users");
  displayUsers(data.users, ulParent);
  displayUsers(data.invites, ulParent);
});

function displayUsers(users, parentNode) {
  users.forEach((user) => {
    const liContainer = createTagWithClasses("li", "user");
    if (user.id) { //detects whether invite or active
      const info = createInfo(user.full_name, user.email, user.phone)
      const action = createActions(true);
      [info, action].forEach((ele) => {
        liContainer.appendChild(ele);
      })
      parentNode.appendChild(liContainer);
    } else {
      const info = createInfo(user.email);
      const action = createActions(false);
      [info, action].forEach((ele) => {
        liContainer.appendChild(ele);
      })
      parentNode.appendChild(liContainer);
    }
  });
}


function createInfo(name, email, phone) {
  article = createTagWithClasses("article", "info");
  article.appendChild(createName(name));
  if (phone){
    article.appendChild(createSubtext(() => makeContactInfo(email, phone)));
  } else {
    article.appendChild(createSubtext(() => makeContactInfo()));
  }
  return article
}

function createActions(active){
  const article = createTagWithClasses("article", "actions");
  if (active) {
    article.appendChild(createTrash());
  } else {
    const resend = makeAction("RESEND");
    resend.classList.add("resend");
    article.appendChild(resend);
    article.appendChild(makeAction("CANCEL"));
  }
  return article;
}

function makeAction(command) {
  const h2 = createTagWithClasses("h2");
  const text = document.createTextNode(command);
  h2.appendChild(text);
  return h2;
}

function createTrash() {
  const buttonContainer = createTagWithClasses("button", "trash");
  buttonContainer.appendChild(createTagWithClasses("span", "trash_body"));
  buttonContainer.appendChild(createTagWithClasses("span", "trash_lid"));
  buttonContainer.appendChild(createTagWithClasses("span", "trash_top"));
  return buttonContainer;
}

function createName(name) {
  const h1 = createTagWithClasses("h1");
  const nameText = document.createTextNode(name);
  h1.appendChild(nameText);
  return h1;
}

function createSubtext(callback) {
  const h3 = createTagWithClasses("h3");
  h3.appendChild(callback())
  return h3
}

function makeContactInfo(email, phoneNum) {
  let text;
  if (email && phoneNum) {
    text = email + " • " + parseNumber(phoneNum);
  } else {
    text = "Pending invitation";
  }
  const textNode = document.createTextNode(text);
  return textNode;
}

// assumes a valid US phone number
function parseNumber(int) {
  const phone = int.toString();
  return `(${phone.substr(1, 3)}) ${phone.substr(4, 3)}-${phone.substr(7, 4)}`;
}


function createTagWithClasses(tag) {
  const newTag = document.createElement(tag);
  for (let x = 1; x < arguments.length; x++) {
    newTag.classList.add(arguments[x]);
  }
  return newTag;
}
