import {getRequest} from '@/services/axios.service';

export async function getProfile(id) {
    const req = await getRequest(`/users/${id}`, 'getProfile');
    if (req.status === 200) {
        return {error: 0, data: req.data};
    }
    return {error: 1, data: req.data};
}
