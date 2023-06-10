import clsx from 'clsx';

import * as $ from './movie-grade-badge.module.scss';

export interface MovieGradeBadgeProps extends BaseProps {
  gradeCode?: string;
}

export default function MovieGradeBadge({ className, gradeCode }: MovieGradeBadgeProps) {
  return <span className={clsx(className, $.base, `--${gradeCode}`)} />
}