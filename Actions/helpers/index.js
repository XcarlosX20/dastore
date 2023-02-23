export const formatearDinero = (amount) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
export const slug = (str) => {
  const string = str.trim();
  return string.replace(/[^a-z0-9\-]/g, "-");
};
export const dislug = (str) => {
  const words = str.split("-");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    words[i] = word.charAt(0) + word.slice(1);
  }
  return words.join(" ");
};
export const formatKeys = (str) => {
  const transform = str.replace(/([A-Z])/g, " $1").toLowerCase();
  return str.charAt(0).toUpperCase() + transform.slice(1);
};
