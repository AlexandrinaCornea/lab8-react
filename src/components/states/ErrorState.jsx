export function ErrorState({ message, compact = false }) {
  return (
    <div className={compact ? 'state-box error compact' : 'state-box error'}>
      <p>{message}</p>
    </div>
  )
}
