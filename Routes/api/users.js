const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../Model/User');

// @route       POST api/users
// @desc        Register user
// @access      Public
router.post(
  '/',
  [
    check('name', 'nama lengkap wajib diisi').not().isEmpty(),
    check('position', 'jabatan wajib diisi').not().isEmpty(),
    check('username', 'username wajib diisi').not().isEmpty(),
    check('password', 'password harus berisi minimal 6 karakter').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // jika terjadi error
      return res.status(400).json({ errors: errors.array() }); // bad request 400, dengan errors.array utk menampilkan error yg terjadi
    }

    const { name, username, password } = req.body;

    try {
      // apakah username exist?
      let user = await User.findOne({ username });

      if (user) {
        res.status(400).json({ errors: [{ msg: 'Username telah digunakan' }] });
      }

      // get gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // encrypt password
      user = new User({
        name,
        position,
        username,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // await user.save(); // save to db

      // return jsonwebtoken
      res.send('User berhasil registrasi');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
