exports.goodreads = (req, res, next) => {
  console.log('Authentication success');
  const io = req.app.get('io');
  const socket = req.app.get('socket');
  const user = {
    id: req.user.id,
    name: req.user.displayName
  };
  console.log(`Name: ${user.name}`);
  socket.emit('goodreads', user);
  // io.emit('goodreads', user);
  res.end();
};
