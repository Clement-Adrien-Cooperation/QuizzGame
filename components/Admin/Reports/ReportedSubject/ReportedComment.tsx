import { Comment } from '@prisma/client';
import { FunctionComponent } from 'react';
import styles from './ReportedSubject.module.scss';

type Props = {
  comment: Comment
};

const ReportedComment: FunctionComponent<Props> = ({
  comment
}) => {

  return (
    <>
      
    </>
  );
};

export default ReportedComment;