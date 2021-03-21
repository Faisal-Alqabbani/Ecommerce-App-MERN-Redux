var msg = "codingdojo";
for (var x = -1; x < msg.length - 1; x++) {
  if (msg.length == 5) {
    for (var i = 0; i < 3; i++) {
      console.log(i);
    }
  } else {
    for (var i = msg.length; i > msg.length - 3; i--) {
      console.log(i);
    }
  }
}
