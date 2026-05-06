import { BUSINESS } from '../lib/constants';

export default function BusinessHours({ className = 'text-gray-600', listClassName = 'mt-2 space-y-1 text-sm' }) {
  return (
    <ul className={`${listClassName} ${className}`}>
      {BUSINESS.hoursLines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}
