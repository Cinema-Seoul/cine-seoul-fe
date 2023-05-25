import clsx from 'clsx';

import { base } from './movie-grade-badge.module.scss';

import type { MovieGrade } from 'cs:movie';

export interface MovieGradeBadgeProps extends BaseProps {
  grade: MovieGrade;
}

export default function MovieGradeBadge({ className, grade }: MovieGradeBadgeProps) {
  return <span className={clsx(className, base, `--${grade}`)} />
}