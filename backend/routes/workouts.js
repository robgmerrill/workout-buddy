import express from 'express';

const router = express.Router();

// GET all workouts
router.get('/', (req, res) => {
    res.json({ message: 'GET all workouts!' });
});

// GET one workout
router.get('/:id', (req, res) => {
    res.json({ message: 'GET one workout!' });
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.json({ message: req.body });
});

router.delete('/:id', (req, res) => {
    res.json({ message: 'DELETE workout!' });
});

router.patch('/:id', (req, res) => {
    res.json({ message: 'UPDATE workout!' });
});

export default router;
