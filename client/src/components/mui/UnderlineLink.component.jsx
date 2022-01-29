import Link from "@material-ui/core/Link";

// underline options: none, hover, always

export default function UnderlineLink({ label, underline, linkTo }) {
  return (
    <Link href={linkTo} underline={underline}>
      {label}
    </Link>
  );
}
