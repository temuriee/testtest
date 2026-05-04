module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    socket.on("join_group", ({ groupCode, student }) => {
      if (!groupCode || !student) return;

      socket.join(groupCode);

      socket.data = { groupCode, student };

      // 🔥 notify admins in same room
      io.to(groupCode).emit("student_joined", {
        socketId: socket.id,
        student,
      });
    });

    socket.on("help_requested", ({ groupCode, student }) => {
      console.log("HELP REQUEST RECEIVED:", groupCode, student); // 👈 დაამატე

      io.to(groupCode).emit("help_requested", {
        socketId: socket.id,
        student,
      });
    });

    socket.on("disconnect", () => {
      const { groupCode, student } = socket.data || {};

      if (groupCode && student) {
        io.to(groupCode).emit("student_disconnected", {
          socketId: socket.id,
        });
      }
    });
  });
};
