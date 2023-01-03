export default function Input ({ ...props }) {
  return (
    <input
      className="mb-2 px-2 py-2 bg-zinc-400/50 dark:bg-zinc-900 placeholder-zinc-600 outline-none"
      {...props}
    />
  )
}
