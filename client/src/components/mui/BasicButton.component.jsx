import Button from "@mui/material/Button";

// Buttons variants: text, contained, outline
export default function BasicButton({ label, variant, cb }) {
  return (
    <Button style={{ fontSize: "20px" }} variant={variant} onClick={cb}>
      {label}
    </Button>
  );
}
