const moongose = require("mongoose");

const contactSchema = moongose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      require: [true, "Please add the contact email"],
    },
    phone: {
      type: String,
      require: [true, "Please add the contact phone number"],
    },
  },
  //add timestamp help you to tracking updateTime and createTime effectively
  {
    timestamps: true,
  }
);

module.exports = moongose.model("Contact", contactSchema);
