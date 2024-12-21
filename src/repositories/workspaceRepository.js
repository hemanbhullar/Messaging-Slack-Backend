import { get } from "mongoose";
import Workspace from "../schema/workspace.js";
import crudRepository from "./crudRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),//destructoring crudReposity

    getWorkspaveByName: async function () {

    },
    getWorkspaceByJoinCode: async function () {

    },
    addMemberToWorkspace: async function () {

    },
    addChannelToWorkspace: async function () {

    },
    fetchAllWorkspaceByMemberId: async function () {
    }
}

export default workspaceRepository;