import styles from './paginator.module.scss';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export function Paginator({
  currentPage,
  totalPages,
  setPage,
}: PaginatorProps) {
  const sequence = Array.from(Array(totalPages), (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <nav className={styles.paginator}>
      <button
        onClick={() => { setPage((prev) => prev + 1); }}
        disabled={currentPage <= 1}
      >
        <div>
          <span>Back</span>
        </div>
      </button>
      <div className={styles.list}>
        {sequence.map(n => (
          <button
            key={n}
            onClick={() => { setPage(n); }}
            className={(currentPage === n) ? styles.active : ''}
          >
            <div>{n}</div>
          </button>
        ))}
      </div>
      <button
        onClick={() => { setPage((prev) => prev - 1); }}
        disabled={currentPage >= totalPages}
      >
        <div>
          <span>Next</span>
        </div>
      </button>
    </nav>
  );
}