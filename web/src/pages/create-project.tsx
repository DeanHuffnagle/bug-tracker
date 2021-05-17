import React from 'react'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

export type CreateProjectProps = {

}

const CreateProject: React.FC<CreateProjectProps> = ({}) => {
    return ();
}


export default withUrqlClient(createUrqlClient)(CreateProject)