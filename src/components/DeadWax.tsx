interface DeadWaxProps {
  author: string;
  date: string;
  customInscription?: string;
}

export function DeadWax({ author, date, customInscription }: DeadWaxProps) {
  const inscription = customInscription
    ? customInscription
    : `~ cut by ${author} / phreak.fm / ${date} ~`;

  return (
    <p className="dead-wax" aria-label="Dead wax inscription">
      {inscription}
    </p>
  );
}
