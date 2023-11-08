import {ListItemColumn} from './ListItemColumn';
import {UserData} from './UserData';
import {Teams} from './Teams';

export interface ListItem {
    id: string;
    url?: string;
    columns: Array<ListItemColumn>;
    navigationProps?: UserData | Teams;
}
