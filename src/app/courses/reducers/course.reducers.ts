import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";
import { Course, compareCourses } from "../model/course";

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean;
}

// Adapters are
export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CourseActions.allCoursesLoaded,
        (state, action) => adapter.addAll(
            action.courses, { ...state, allCoursesLoaded: true }
        )
    ),

    on(CourseActions.courseUpdated,
        (state, action) => adapter.updateOne(
            action.update, state
            // action.update, { ...state, allCoursesLoaded: true }
        )
    )
);

export const { selectAll} = adapter.getSelectors();
