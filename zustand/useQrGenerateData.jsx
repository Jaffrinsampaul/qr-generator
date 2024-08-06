const { create } = require("zustand");

export const useQRgeneratedata = create((set) => ({
  data: "",
  updateUserInput: (userInput) => {
    set(() => ({
      data: userInput,
    }));
  },
}));
