import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res) => {
  const { username, email, profilePicture, oldPassword, newPassword } =
    req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let hashedPassword = undefined;

    if (oldPassword || newPassword) {
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both passwords are required" });
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        username: username || undefined,
        email: email || undefined,
        profilePicture: profilePicture || undefined,
        password: hashedPassword || undefined,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
