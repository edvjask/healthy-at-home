using HealthyAtHomeAPI.Enumerators;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Builders;

public class ExerciseBuilder
{
    private static int number = 10;
    private Exercise _exercise;

    public ExerciseBuilder()
    {
        _exercise = new Exercise
        {
            Id = number++
        };
    }

    public ExerciseBuilder Reset()
    {
        _exercise = new Exercise
        {
            Id = number++
        };
        return this;
    }

    public ExerciseBuilder AddId(int id)
    {
        _exercise.Id = id;
        return this;
    }

    public ExerciseBuilder AddName(string name)
    {
        _exercise.Name = name;
        return this;
    }

    public ExerciseBuilder AddInstruction(string instructions)
    {
        _exercise.Instructions = instructions;
        return this;
    }

    public ExerciseBuilder AddDifficulty(ELevelsOfDifficulty difficulty)
    {
        _exercise.ExerciseDifficulty = difficulty;
        return this;
    }

    public ExerciseBuilder AddType(EExerciseType type)
    {
        _exercise.ExerciseType = type;
        return this;
    }

    public ExerciseBuilder AddInventoryType(EInventoryType inventoryType)
    {
        _exercise.InventoryTypes.Add(inventoryType);
        return this;
    }

    public ExerciseBuilder AddMuscleGroup(EMuscleGroup muscleGroup)
    {
        _exercise.MuscleGroups.Add(muscleGroup);
        return this;
    }

    public ExerciseBuilder AddHarderVariationId(int id)
    {
        _exercise.HarderVariationId = id;
        return this;
    }

    public ExerciseBuilder AddEasierVariationId(int id)
    {
        _exercise.EasierVariationId = id;
        return this;
    }

    public ExerciseBuilder AddYoutubeLink(string link)
    {
        _exercise.YoutubeLink = link;
        return this;
    }

    public ExerciseBuilder AddCue(ECueType cueType, string description)
    {
        _exercise.ExerciseCues.Add(
            new ExerciseCue
            {
                CueType = cueType,
                Description = description,
                Exercise = _exercise,
                ExerciseId = _exercise.Id
            }
        );
        return this;
    }

    public Exercise Build()
    {
        return _exercise;
    }
}