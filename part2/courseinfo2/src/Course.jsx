const Course = ({ courses }) => {
  return courses.map(course => {
  const allExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises, 0
  )

  return (
    <div key={course.id}>
      <h2>{course.name}</h2>
      {course.parts.map(part => (
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
      ))}
      <b>total of {allExercises} exercises</b>
    </div>
  )
})
}

export default Course
