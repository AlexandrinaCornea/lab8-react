export function LoadingState({ message, compact = false }) {
  return (
    <div className={compact ? 'state-box compact' : 'state-box'}>
      <div className="spinner" />
      <p>{message}</p>
    </div>
  )
}
