export const inputDetails = [
  {
    id: "name",
    label: "Name *",
    type: "text",
    value: "",
    name: "name",
  },
  {
    id: "email",
    label: "Email *",
    type: "email",
    value: "",
    name: "email",
  },
];
export const inputFields = [
  {
    label: "Enter your email",
    type: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    label: "Enter your password",
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];

export const inputFieldsResetPassword = ({
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
}: {
  newPassword: string;
  confirmPassword: string;
  setNewPassword: Function;
  setConfirmPassword: Function;
}) => {
  const inputFields = [
    {
      id: "new-password",
      type: "password",
      label: "New password",
      value: newPassword,
      setValue: setNewPassword,
    },
    {
      id: "confirm-password",
      type: "password",
      label: "Confirm password",
      value: confirmPassword,
      setValue: setConfirmPassword,
    },
  ];

  return inputFields;
};

export const inputFieldsSignup = [
  {
    label: "Enter your email to get started.",
    type: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    label: "Enter your full name.",
    type: "text",
    placeholder: "John Doe",
    name: "fullname",
  },
  {
    label: "Enter your username",
    type: "text",
    placeholder: "John Doe",
    name: "username",
  },
  {
    label: "Choose a password with at least 8 characters.",
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];
