const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../../controllers/taskController');
const { readJsonFile, writeJsonFile } = require('../../utils/fileOperations');
const { ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../../constants/app-constants');

jest.mock('../../utils/fileOperations', () => ({
    readJsonFile: jest.fn(),
    writeJsonFile: jest.fn(),
}));

describe('Task Management Functions', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {
            user: { username: 'testUser' },
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('getTasks', () => {
        it('should return filtered and paginated tasks', async () => {
            const tasks = {
                testUser: [
                    { id: '1', title: 'Task 1', priority: 'High', dueDate: '2025-01-01' },
                    { id: '2', title: 'Task 2', priority: 'Low', dueDate: '2025-02-01' },
                ],
            };
            readJsonFile.mockResolvedValue(tasks);

            mockReq.query = { priority: 'High', page: 1, limit: 1 };

            await getTasks(mockReq, mockRes);

            expect(readJsonFile).toHaveBeenCalledWith(expect.any(String));
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    tasks: [tasks.testUser[0]],
                })
            );
        });

        it('should return error if no tasks found for user', async () => {
            readJsonFile.mockResolvedValue({});

            await getTasks(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'No tasks for this user' });
        });
    });

    describe('getTaskById', () => {
        it('should return a task by ID', async () => {
            const tasks = {
                testUser: [{ id: '1', title: 'Task 1', priority: 'High' }],
            };
            readJsonFile.mockResolvedValue(tasks);

            mockReq.params = { taskId: '1' };

            await getTaskById(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                task: tasks.testUser[0],
            });
        });

        it('should return error if task not found', async () => {
            readJsonFile.mockResolvedValue({ testUser: [] });

            mockReq.params = { taskId: '1' };

            await getTaskById(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: ERROR_MESSAGES.TASK_NOT_FOUND });
        });
    });

    describe('createTask', () => {
        it('should create a task successfully', async () => {
            readJsonFile.mockResolvedValue({});
            writeJsonFile.mockResolvedValue();

            mockReq.body = {
                title: 'Task 1',
                description: 'Description 1',
                priority: 'High',
                dueDate: '2025-01-01',
            };

            await createTask(mockReq, mockRes);

            expect(writeJsonFile).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: SUCCESS_MESSAGES.TASK_CREATED,
                })
            );
        });

        it('should return error if required fields are missing', async () => {
            await createTask(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: ERROR_MESSAGES.REQUIRED_FIELDS_MISSING });
        });
    });

    describe('updateTask', () => {
        it('should update a task successfully', async () => {
            const tasks = {
                testUser: [{ id: '1', title: 'Task 1', priority: 'High', dueDate: '2025-02-01'}],
            };
            readJsonFile.mockResolvedValue(tasks);
            writeJsonFile.mockResolvedValue();

            mockReq.params = { taskId: '1' };
            mockReq.body = {
                title: 'Updated Task 1',
                description: 'Updated Description 1',
                priority: 'Low',
                dueDate: '2025-02-01',
            };

            await updateTask(mockReq, mockRes);

            expect(writeJsonFile).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: SUCCESS_MESSAGES.TASK_UPDATED,
                })
            );
        });

        it('should return error if fields are missing', async () => {
            readJsonFile.mockResolvedValue({ testUser: [] });

            mockReq.params = { taskId: '11' };

            await updateTask(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ error: ERROR_MESSAGES.REQUIRED_FIELDS_MISSING });
        });
    });

    describe('deleteTask', () => {
        it('should delete a task successfully', async () => {
            const tasks = {
                testUser: [{ id: '1', title: 'Task 1', priority: 'High' }],
            };
            readJsonFile.mockResolvedValue(tasks);
            writeJsonFile.mockResolvedValue();

            mockReq.params = { taskId: '1' };

            await deleteTask(mockReq, mockRes);

            expect(writeJsonFile).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: SUCCESS_MESSAGES.TASK_DELETED,
            });
        });

        it('should return error if task not found', async () => {
            readJsonFile.mockResolvedValue({ testUser: [] });

            mockReq.params = { taskId: '1' };

            await deleteTask(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: ERROR_MESSAGES.TASK_NOT_FOUND });
        });
    });
});
